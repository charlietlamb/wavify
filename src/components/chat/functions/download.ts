import downloadChatImage from "../actions/downloadFile";

export async function download(fileUrl: string, fileName: string) {
  const url = await downloadChatImage(fileUrl);
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}
