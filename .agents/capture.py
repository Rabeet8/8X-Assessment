import sys
import json
import os
from datetime import datetime

def main():
    try:
        input_data = sys.stdin.read()
        payload = json.loads(input_data)
        
        # The first workspace path is usually the project root
        workspace = payload.get("workspacePaths", ["."])[0]
        transcript_path = payload.get("transcriptPath")
        conversation_id = payload.get("conversationId", "unknown")
        model_name = payload.get("modelName", "unknown")
        
        if not transcript_path or not os.path.exists(transcript_path):
            print(json.dumps({}))
            return
            
        logs_dir = os.path.join(workspace, ".agent-logs")
        os.makedirs(logs_dir, exist_ok=True)
        
        entries = []
        with open(transcript_path, 'r') as f:
            for line in f:
                try:
                    entries.append(json.loads(line))
                except:
                    pass
                    
        # Group into exchanges
        exchanges = []
        current_prompt = None
        
        for entry in entries:
            if entry.get("type") == "USER_INPUT" and entry.get("source") == "USER_EXPLICIT":
                if current_prompt:
                    exchanges.append(current_prompt)
                current_prompt = {
                    "prompt": entry.get("content", ""),
                    "prompt_time": entry.get("created_at"),
                    "response": "",
                    "response_time": None
                }
            elif entry.get("type") == "PLANNER_RESPONSE" and entry.get("source") == "MODEL":
                if current_prompt:
                    # Capture the textual content. 
                    # If multiple responses exist in a turn, this captures the last non-empty one.
                    content = entry.get("content", "")
                    if content:
                        current_prompt["response"] = content
                        current_prompt["response_time"] = entry.get("created_at")
        
        if current_prompt:
            exchanges.append(current_prompt)
            
        if not exchanges:
            print(json.dumps({}))
            return
            
        # Write to log file
        first_time = exchanges[0]["prompt_time"]
        # Format string expects e.g., '2026-10-01T00:04:17Z'
        try:
            dt = datetime.strptime(first_time, "%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            dt = datetime.utcnow()
            
        filename = f"{dt.strftime('%Y-%m-%d_%H-%M-%S')}_{conversation_id}.md"
        filepath = os.path.join(logs_dir, filename)
        
        date_str = dt.strftime('%Y-%m-%d')
        total_exchanges = len(exchanges)
        last_time = exchanges[-1]["prompt_time"]
        
        with open(filepath, 'w') as f:
            f.write(f"---\n")
            f.write(f"session_id: {conversation_id}\n")
            f.write(f"date: {date_str}\n")
            f.write(f"author: Rabeet\n")
            f.write(f"model: {model_name}\n")
            f.write(f"tool: antigravity-ide\n")
            f.write(f"project: 8x-assignment\n")
            f.write(f"total_exchanges: {total_exchanges}\n")
            f.write(f"first_prompt_time: {first_time}\n")
            f.write(f"last_prompt_time: {last_time}\n")
            f.write(f"---\n\n")
            f.write(f"# Session Log - {date_str}\n\n")
            f.write(f"Session: `{conversation_id[:8]}` | Project: `8x-assignment` | Author: `Rabeet`\n\n")
            f.write(f"---\n\n")
            
            for i, ex in enumerate(exchanges, 1):
                f.write(f"[LOG_ENTRY type=PROMPT num={i} session={conversation_id[:8]}]\n")
                f.write(f"timestamp: {ex['prompt_time']}\n")
                f.write(f"model: {model_name}\n\n")
                f.write(f"{ex['prompt']}\n\n\n")
                
                f.write(f"[LOG_ENTRY type=RESPONSE num={i} session={conversation_id[:8]}]\n")
                f.write(f"timestamp: {ex['response_time'] or ex['prompt_time']}\n")
                f.write(f"model: {model_name}\n\n")
                f.write(f"{ex['response']}\n\n\n")
                
        print(json.dumps({}))
    except Exception as e:
        print(json.dumps({}))

if __name__ == "__main__":
    main()
