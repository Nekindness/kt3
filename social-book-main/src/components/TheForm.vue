<script lang="ts" setup>
import { ref } from "vue";
import { usePosts } from "../stores/posts";

const store = usePosts();

const message = ref<string>("");
const textarea = ref();

const adjustTextarea = (): void => {
  textarea.value.style.height = "50px";
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
};
</script>

<template>
  <section class="form">
    <div class="container">
      <form
        @submit.prevent="
          store.addPost(message);
          message = '';
        "
      >
        <textarea
          ref="textarea"
          v-model="message"
          @input="adjustTextarea"
          placeholder="Новый пост ..."
          required
        ></textarea>
        <button type="submit">Добавить</button>
      </form>
    </div>
  </section>
</template>

<style lang="scss">
.form {
  form {
    padding: 20px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 20px;
    background: #fff;
    border: 2px solid rgba(0, 148, 255, 1);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
  }

  textarea {
    padding: 10px;
    flex-grow: 1;
    height: 50px;
    max-height: 200px;
    font-size: 24px;
    font-family: "Montserrat", sans-serif;
    border: 1px solid rgba(110, 110, 110, 1);
    border-radius: 15px;
    overflow: hidden;
    resize: none;
  }

  button {
    height: 50px;
    width: 180px;
    color: #fff;
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 0.5px;
    background: rgba(33, 108, 255, 1);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
