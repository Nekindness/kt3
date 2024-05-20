<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { usePosts } from "../stores/posts";
import type { Post } from "../types";

const store = usePosts();
const show = defineModel("modelValue", { type: Boolean });
const props = defineProps<{ post: Post }>();

const message = ref<string>("");
const textarea = ref();

const adjustTextarea = (): void => {
  textarea.value.style.height = "50px";
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
};

watchEffect(() => {
  if (props.post) {
    message.value = props.post.title;
  }
});
</script>

<template>
  <div class="popup" v-if="show">
    <form
      @submit.prevent="
        props.post && store.updatePost(props.post.id, message);
        show = false;
      "
      class="popup__form container"
    >
      <textarea
        ref="textarea"
        v-model="message"
        @input="adjustTextarea"
        placeholder="Новый пост ..."
        required
      ></textarea>
      <div class="flex">
        <button class="btn-edit" type="submit">Подтвердить</button>
        <button class="btn-close" @click="show = false">Закрыть</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(108, 158, 255, 0.59);
  backdrop-filter: blur(5px);

  &__form {
    padding: 20px;
    background: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  textarea {
    padding: 10px;
    flex-grow: 1;
    height: 140px;
    max-height: 240px;
    font-size: 24px;
    font-family: "Montserrat", sans-serif;
    border: 1px solid rgba(110, 110, 110, 1);
    border-radius: 15px;
    overflow: hidden;
    resize: none;
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
  }
}
</style>
