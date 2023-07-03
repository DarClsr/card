<template>
  <div class="p-3">
    <el-input
      class="t-my-4"
      placeholder="请输入您描述的问题"
      type="textarea"
      rows="6"
      max="100"
      v-model="question"
    />

    <div class="w-full t-flex t-justify-end">
      <el-button type="primary" @click="submit">提问</el-button>
    </div>

    <div class="answer">
      <span class="title">chatGpt回答:</span>
      <div
        class="messgae-item"
        v-for="(message, index) of messageList"
        :key="index"
      >
        <div class="question w-full t-flex t-justify-end t-items-center">
          <span
            class="t-max-w-1/2 t-bg-orange t-text-right t-p-3 t-text-white"
            >{{ message.question }}</span
          >
          <el-avatar :size="50" class="mx-4" />
        </div>
        <div class="answer w-full t-flex t-justify-start t-items-center">
          <el-avatar class="mx-4" :size="50" />
          <div class="t-max-w-1/2 t-bg-primary t-text-left">
            <div v-html="message.answers"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getText } from "@/api/open";
import http from "@/utils/http";
import axios from "Axios";
import { ElMessage } from "element-plus";
const question = ref("");
const question_type = ref("text");
const answer = ref("");
const messageIndex = ref(0);
type Imessage = {
  question: string;
  answers: string;
  conversationId: string;
  parentMessageId: string;
};
let messageList = ref<Imessage[]>([]);

const getChatGpt2 = () => {
  const eventSource = new EventSource("http://localhost:7002/admin/api/stream");
  eventSource.addEventListener("message", (e) => {
    console.log(e);
  });
};

const getGptText = (word: string) => {
  question.value = "";
  let conversationId=messageList.value[messageIndex.value-1]?.conversationId ?? "";
  let parentMessageId=messageList.value[messageIndex.value-1]?.parentMessageId ?? "";
  fetch(`http://localhost:7002/admin/api/open/word?word=${word}&conversationId=${conversationId}&parentMessageId=${parentMessageId}`, {
    mode: "cors",
    method: "GET",  
  })
    .then((res) => {
      const reader: any = res.body?.getReader();
      const decoder = new TextDecoder();
      let chatLog = "";
      reader.read().then(function processResult(result: any) {
        if (result.done) {
          messageList.value[messageIndex.value].answers = chatLog ?? "";

          console.log(messageList.value[messageIndex.value])
          return;
        }

        const chunk = decoder.decode(result.value, { stream: true });
        if (chunk.length == 1) {
          chatLog += chunk;
        } else {
          try {
            const res = JSON.parse(chunk);
            const isNumber = parseFloat(chunk as any).toString() !== "NaN";
            if (isNumber) {
              chatLog += chunk;
            } else {
              messageList.value[messageIndex.value].conversationId =
                res.id ?? "";
              messageList.value[messageIndex.value].parentMessageId =
                res.parentMessageId ?? "";
            }
          } catch (e) {
            chatLog += chunk;
          }
        }
        messageList.value[messageIndex.value].answers = chatLog ?? "";
        return reader.read().then(processResult);
      });
    })
    .catch((e) => {
      console.log(e, "error");
    });
};

const submit = () => {
  if (!question.value) {
    return ElMessage.error("不可以哦");
  }
  messageList.value.push({
    question: question.value,
    answers: "",
    conversationId: "",
    parentMessageId: "",
  });
  messageIndex.value = messageList.value.length - 1;
  getGptText(question.value);
};
</script>
