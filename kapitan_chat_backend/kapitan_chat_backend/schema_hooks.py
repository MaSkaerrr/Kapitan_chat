def add_tag_groups(result, generator, request, public):
    result["x-tagGroups"] = [
        {"name": "chat", "tags": ["chats", "messages", "attachments"]},
        {"name": "users", "tags": ["users"]},
        {"name": "settings", "tags": ["settings_api"]},
    ]
    return result