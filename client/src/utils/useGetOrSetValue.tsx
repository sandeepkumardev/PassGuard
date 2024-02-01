export const getOrSetValue = () => {
  const data = localStorage.getItem("include_resolved");

  if (!data) {
    localStorage.setItem("include_resolved", JSON.stringify({ status: false }));
    return false;
  }

  const { status } = JSON.parse(data || "");
  return status;
};
