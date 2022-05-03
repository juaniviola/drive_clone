export default function pathUtil(path) {
  return new URL(path, import.meta.url);
}
