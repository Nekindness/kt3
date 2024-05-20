import { ref } from "vue";
import { defineStore } from "pinia";
import type { Post } from "../types";

export const usePosts = defineStore("posts", () => {
  const posts = ref<Post[]>([
    {
      id: 1,
      title:
        "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
      comments: [
        {
          id: 1,
          text: "Первый комментарий о выше сказанном посте ...",
        },
        {
          id: 2,
          text: "Второй комментарий о выше сказанном посте ...",
        },
      ],
    },
    {
      id: 2,
      title:
        "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
      comments: [
        {
          id: 1,
          text: "Первый комментарий о выше сказанном посте ...",
        },
        {
          id: 2,
          text: "Второй комментарий о выше сказанном посте ...",
        },
      ],
    },
  ]);

  const addPost = (title: string): void => {
    posts.value.push({
      id: posts.value.length ? posts.value[posts.value.length - 1].id + 1 : 1,
      title,
      comments: [],
    });
  };

  const updatePost = (id: number, title: string): void => {
    const index = posts.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts.value[index].title = title;
    }
  };

  const deletePost = (id: number): void => {
    const index = posts.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts.value.splice(index, 1);
    }
  };

  const addComment = (postId: number, text: string): void => {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      post.comments.push({
        id: post.comments.length
          ? post.comments[post.comments.length - 1].id + 1
          : 1,
        text,
      });
    }
  };

  const deleteComment = (postId: number, commentId: number): void => {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      const index = post.comments.findIndex((c) => c.id === commentId);
      if (index !== -1) {
        post.comments.splice(index, 1);
      }
    }
  };

  return { posts, addPost, updatePost, deletePost, addComment, deleteComment };
});
