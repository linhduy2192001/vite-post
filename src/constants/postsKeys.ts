export const postsKeys = {
  all: ["posts"],
  detail: (id: number) => [...postsKeys.all, id],
  list: (filters: unknown) => [...postsKeys.all, filters],
};
