import debounce from "lodash.debounce";

const scrollDebounce = (prop) => {
  window.onscroll = debounce(() => {
    const {
      state: { error, loading, next_books },
    } = prop;

    if (error || loading) return;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      prop.refreshList(next_books);
    }
  }, 100);
};

export default scrollDebounce;
