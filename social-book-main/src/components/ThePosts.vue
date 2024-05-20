<script lang="ts" setup>
import { ref } from "vue";
import { usePosts } from "../stores/posts";
import ThePopup from "./ThePopup.vue";
import ThePost from "./ThePost.vue";
import type { Post } from "../types";

const store = usePosts();

const comment = ref<string>("");
const activePost = ref();
const showPopup = ref<boolean>(false);

const editPost = (post: Post): void => {
  showPopup.value = true;
  activePost.value = post;
};
</script>

<template>
  <teleport to="body">
    <ThePopup v-model="showPopup" :post="activePost"></ThePopup>
  </teleport>

  <section class="posts">
    <div class="container">
      <div class="posts__list">
        <ThePost
          v-for="post in store.posts"
          :key="post.id"
          :post="post"
          @editPost="editPost"
        ></ThePost>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.posts {
  margin-top: 60px;

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 40px;
  }
}
</style>
