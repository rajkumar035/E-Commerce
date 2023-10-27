export default function getCookie(key: string) {
  if (typeof document !== "undefined") {
    const cookie = document.cookie;
    const cookieArray = cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      const element = cookieArray[i];
      const value = element.split("=");
      if (value.length > 0 && value[0].replace(/\s/g, "") === key) {
        return value[1];
      }
    }
  }

  return "";
}
