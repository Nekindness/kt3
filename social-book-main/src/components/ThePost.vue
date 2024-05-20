<script lang="ts" setup>
import { ref } from "vue";
import { usePosts } from "../stores/posts";
import type { Post } from "../types";

const store = usePosts();
const props = defineProps<{ post: Post }>();
const emits = defineEmits(["editPost"]);

const comment = ref<string>("");
const isShow = ref<boolean>(false);
const showPopup = ref<boolean>(true);
</script>

<template>
  <div class="post">
    <div class="post__text">
      {{ post.title }}
    </div>
    <hr />
    <ul class="post__comments" v-if="isShow">
      <li>
        <form
          class="post__comments-form"
          @submit.prevent="
            store.addComment(post.id, comment);
            comment = '';
          "
        >
          <input
            type="text"
            placeholder="Новый комментарий ..."
            v-model="comment"
          />
          <button class="btn-add" type="submit">Добавить</button>
        </form>
      </li>
      <li
        v-for="comment in post.comments"
        :key="comment.id"
        class="post__comments-item"
      >
        <span>{{ comment.text }}</span>
        <button
          class="btn-delete"
          @click="store.deleteComment(post.id, comment.id)"
        >
          Удалить
        </button>
      </li>
      <li>
        <button class="btn-hide" @click="isShow = !isShow">Спрятать</button>
      </li>
    </ul>
    <div class="post__actions" v-else>
      <button class="btn-comments" @click="isShow = !isShow">
        Комментарии
      </button>
      <div class="text-base">
        Количество комментарий - {{ post.comments.length }}
      </div>
      <button class="btn-edit" @click="emits('editPost', post)">
        Изменить
      </button>
      <button class="btn-delete" @click="store.deletePost(post.id)">
        Удалить
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.post {
  padding: 20px;
  width: 100%;
  background: #fff;
  border: 2px solid rgba(0, 148, 255, 1);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  &__text {
    font-size: 24px;
  }

  hr {
    width: 100%;
    height: 1px;
    background: rgba(156, 156, 156, 1);
    outline: none;
    border: none;
  }

  &__comments {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;

    li {
      width: 100%;
    }

    &-form {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      input {
        padding: 10px 18px;
        flex-grow: 1;
        min-height: 45px;
        font-size: 16px;
        border: 1px solid rgba(110, 110, 110, 1);
        border-radius: 15px;
      }
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 20px;

      span {
        padding: 10px 18px;
        flex-grow: 1;
        min-height: 45px;
        border: 2px solid rgba(0, 148, 255, 1);
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
      }

      .btn-delete {
        min-width: 110px;
      }
    }
  }

  &__actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;

    .text-base {
      margin-right: auto;
    }
  }
}
</style>
