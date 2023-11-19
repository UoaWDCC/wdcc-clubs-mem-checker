export const getTextColor = (hex: string) => {
  if (hex === "#ffffff") return "#666666";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#4F4F4F" : "#ffffff";
};

export const lightenColor = (hex: string, amt: number): string => {
  const color = hex.replace("#", "");
  const num = parseInt(color, 16);
  const r = Math.min(255, (num >> 16) + amt);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const b = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

export const getImageFileFromUrl = async (
  imageUrl: string,
  fileName: string
) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const file = new File([blob], fileName, {
    type: response.headers.get("content-type") || "image/jpeg",
  });

  return file;
};
