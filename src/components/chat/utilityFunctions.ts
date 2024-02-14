export function isJson(value: unknown): value is Json {
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return true;
    case "object":
      if (Array.isArray(value)) {
        return value.every(isJson);
      }
      if (value === null) {
        return true;
      }
      return value && Object.values(value).every(isJson);
    default:
      return false;
  }
}

export function isMessageAuthor(value: unknown): value is MessageAuthor {
  return (
    typeof value === "object" &&
    value !== null &&
    "users" in value &&
    typeof value.users === "object" &&
    value.users !== null &&
    "username" in value.users &&
    typeof value.users.username === "string" &&
    "profile_pic_url" in value.users &&
    typeof value.users.profile_pic_url === "string"
  );
}

export function isMessageAndAuthor(
  variable: any
): variable is MessageAndAuthor {
  return (
    variable &&
    typeof variable.author === "string" &&
    typeof variable.chat === "string" &&
    (typeof variable.content === "string" || variable.content === null) &&
    (typeof variable.createdAt === "string" || variable.createdAt === null) &&
    (typeof variable.deleted === "boolean" || variable.deleted === null) &&
    (typeof variable.edited === "boolean" || variable.edited === null) &&
    (typeof variable.editedAt === "string" || variable.editedAt === null) &&
    typeof variable.files === "object" &&
    typeof variable.id === "string"
  );
}

export function isMessagesToRender(
  variable: any
): variable is MessagesToRender {
  return (
    variable &&
    Array.isArray(variable.pages) &&
    variable.pages.every(
      (page: MessageAndAuthor) =>
        page === null || (Array.isArray(page) && page.every(isMessageAndAuthor))
    )
  );
}