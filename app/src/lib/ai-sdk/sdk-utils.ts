// Utility functions

export function formatJSONString(str: string, indent = 2) {
    try {
      const obj = JSON.parse(str);
      // Special handling for response text to preserve formatting
      if (obj.answer || obj.text || obj.response) {
        const mainText = obj.answer || obj.text || obj.response;
        // Keep the main text as is, but format the rest
        const rest = { ...obj };
        delete rest.answer;
        delete rest.text;
        delete rest.response;
        return mainText + (Object.keys(rest).length > 0 ? "\n\n" + JSON.stringify(rest, null, indent) : "");
      }
      return JSON.stringify(obj, null, indent);
    } catch {
      return str;
    }
  }
  
  // Add this helper function at the top of the file
  export function formatMarkdownContent(content: any): string {
    if (content == null) return "";
    if (typeof content === "string") return content;
    try {
      return JSON.stringify(content, null, 2);
    } catch {
      return String(content);
    }
  }
  
  export const getDisplayTextFromHistory = (parsedItem: Record<string, any>): string => {
    const values = Object.values(parsedItem);
    for (const value of values) {
      if (typeof value === "string" && value.trim()) {
        return value;
      }
    }
    return "Empty input";
  };
  
  export const formatDisplayText = (text: string): string => {
    return text.length > 50 ? `${text.slice(0, 50)}...` : text;
  };
  