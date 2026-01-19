import os
from huggingface_hub import HfApi, get_token
from dotenv import load_dotenv

load_dotenv()

# Configuration
REPO_NAME = "flight-backend-mcp"
USERNAME = "abdullah9873"  # Confirmed via hf_whoami
REPO_ID = f"{USERNAME}/{REPO_NAME}"

# Secrets to set
SECRETS = {
    "GEMINI_API_KEY": os.getenv("GEMINI_API_KEY"),
    "AMADEUS_CLIENT_ID": os.getenv("AMADEUS_CLIENT_ID"),
    "AMADEUS_CLIENT_SECRET": os.getenv("AMADEUS_CLIENT_SECRET"),
}

def deploy():
    print(f"Deploying to {REPO_ID}...")
    api = HfApi()
    token = get_token()
    
    if not token:
        print("Error: No Hugging Face token found. Please login.")
        return

    # 1. Create the Space (if it doesn't exist)
    try:
        api.create_repo(
            repo_id=REPO_ID,
            repo_type="space",
            space_sdk="docker",
            private=False,  # Public by default, or True if preferred
            exist_ok=True
        )
        print(f"Space {REPO_ID} created/verified.")
    except Exception as e:
        print(f"Error creating space: {e}")
        return

    # 2. Set Secrets
    print("Setting secrets...")
    for key, value in SECRETS.items():
        if value:
            try:
                api.add_space_secret(repo_id=REPO_ID, key=key, value=value)
                print(f"Secret {key} set.")
            except Exception as e:
                print(f"Error setting secret {key}: {e}")
        else:
            print(f"Warning: {key} not found in environment.")

    # 3. Upload Files
    print("Uploading files...")
    files_to_upload = [
        "Dockerfile",
        "requirements.txt",
        "main.py",
        "connection.py",
        "README.md"
    ]
    
    for file in files_to_upload:
        if os.path.exists(file):
            try:
                api.upload_file(
                    path_or_fileobj=file,
                    path_in_repo=file,
                    repo_id=REPO_ID,
                    repo_type="space",
                    commit_message=f"Upload {file}"
                )
                print(f"Uploaded {file}.")
            except Exception as e:
                print(f"Error uploading {file}: {e}")
        else:
            print(f"Warning: File {file} not found locally.")

    print("Deployment complete! Check your space at:")
    print(f"https://huggingface.co/spaces/{REPO_ID}")

if __name__ == "__main__":
    deploy()
