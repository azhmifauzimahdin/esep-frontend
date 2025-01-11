import { useEffect } from "react";

const DocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `RSI APP | ${title}`;
  }, [title]);
};

export default DocumentTitle;
