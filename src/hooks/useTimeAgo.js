import React from "react";

export const useTimeAgo = () => {
  const getTimeAgo = (timestamp) => {
    const now = new Date(); //get current date & time
    const date = timestamp.toDate(); //convert to js date object

    // Get past time in seconds
    const diffInSecs = Math.floor((now - date) / 1000);
    if (diffInSecs < 60) {
      return `${diffInSecs} secs ago`;
    }

    // Get past time in minutes
    const diffInMins = Math.floor(diffInSecs / 60);
    if (diffInMins < 60) {
      return `${diffInMins} min${diffInMins > 1 ? "s" : ""} ago`;
    }

    // Get past time in hours
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    // Get past time in days
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 31) {
      return `${diffInDays < 2 ? "Yesterday" : diffInDays + " days ago"}`;
    }

    // return actual date if past a month
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return { getTimeAgo };
};
