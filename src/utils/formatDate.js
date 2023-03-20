const changeFormatDate = (date) => {
    let newDate = new Date(date);
    let options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour12 : false,
      hour:  "2-digit",
      minute:  "2-digit",
    };
    return newDate.toLocaleDateString("en-us", options);
  };

export default changeFormatDate;