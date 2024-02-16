import { v4 as uuidv4 } from "uuid";

export function handleInput(
  e: React.ChangeEvent<HTMLInputElement>,
  maxUpload: number | undefined,
  multipleFiles: boolean | undefined,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setImageSrc: React.Dispatch<React.SetStateAction<string>>,
  setUploaded: React.Dispatch<React.SetStateAction<boolean>>,
  uploadFunction: (imageFile: File | File[]) => void,
  displayFiles: { file: File; id: string }[],
  setDisplayFiles: React.Dispatch<
    React.SetStateAction<{ file: File; id: string }[]>
  >
) {
  var maxSize = maxUpload ? maxUpload : 5;
  const acceptedImageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  if (e.target.files) {
    if (!multipleFiles) {
      var file = e.target.files[0];
      if (file.size > maxSize * 1024 * 1024) {
        setErrorMessage(`File size exceeds ${maxSize}MB`);
        return;
      }
      setErrorMessage("");
      var extension =
        file && file.name && file.name.split(".")
          ? file.name.split(".").pop()
          : "";
      if (acceptedImageTypes.includes(extension ? extension : "")) {
        setImageSrc(URL.createObjectURL(file));
      }
      setUploaded(true);
      if (uploadFunction) {
        uploadFunction(file);
      }
    } else {
      var files = e.target.files;
      if (files instanceof FileList) {
        var newFiles = [...files];
        newFiles.forEach((file) => {
          if (file.size > maxSize * 1024 * 1024) {
            setErrorMessage(`File size exceeds ${maxSize}MB`);
            return;
          }
        });
        setErrorMessage("");
        newFiles.forEach((file) => {
          var extension =
            file && file.name && file.name.split(".")
              ? file.name.split(".").pop()
              : "";
          if (acceptedImageTypes.includes(extension ? extension : "")) {
            setImageSrc(URL.createObjectURL(file));
          }
        });
        setDisplayFiles([
          ...displayFiles,
          ...newFiles.map((file) => ({ file, id: uuidv4() })),
        ]);
        if (uploadFunction) {
          uploadFunction(newFiles);
        }
      } else {
        var file = e.target.files[0];
        if (file.size > maxSize * 1024 * 1024) {
          setErrorMessage(`File size exceeds ${maxSize}MB`);
          return;
        }
        setErrorMessage("");
        var extension =
          file && file.name && file.name.split(".")
            ? file.name.split(".").pop()
            : "";
        if (acceptedImageTypes.includes(extension ? extension : "")) {
          setImageSrc(URL.createObjectURL(file));
        }
        setDisplayFiles([...displayFiles, { file, id: uuidv4() }]);
        if (uploadFunction) {
          uploadFunction(file);
        }
      }
    }
  }
}
