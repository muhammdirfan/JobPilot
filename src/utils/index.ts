export function parseAIResponse(raw: string) {
  const lines = raw.split("\n");

  const result: any = {};
  lines.forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;

    const value = rest.join(":").trim();
    switch (key.toLowerCase()) {
      case "company":
        result.company = value;
        break;
      case "position":
        result.position = value;
        break;
      case "status":
        result.status = value.toLowerCase();
        break;
      case "link":
        result.url = value;
        break;
      case "notes":
        result.notes = value;
        break;
    }
  });

  return result;
}
