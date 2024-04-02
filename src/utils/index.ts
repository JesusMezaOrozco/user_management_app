import { Title } from "../types";

export const getTitle = (title: Title) => {
  switch (title) {
    case "mr":
      return "Sr";
    case "ms":
      return "Sra";
    case "mrs":
      return "Sra";
    case "miss":
      return "Srta";
    case "dr":
      return "Dr";
    case "":
      return "";
    default:
      break;
  }
};
