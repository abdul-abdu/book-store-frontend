import debounce from "lodash.debounce";

const scrollDebounce = (prop) => {
  window.onscroll = debounce(() => {
    const { error, loading, nextQuery, refreshList } = prop;

    if (error || loading) return;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      refreshList(nextQuery);
    }
  }, 100);
};

export default scrollDebounce;
