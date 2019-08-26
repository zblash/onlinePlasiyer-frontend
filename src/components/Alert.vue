<template>
  <div class="message-bar" id="alert-modal" v-if="message" >
    <div :class="messageClass">
      <button class="btn btn-link close-btn"  data-dismiss="alert-modal" aria-hidden="true">
        <i class="fa fa-times"></i>
      </button>
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Alert",
      props: {
          message: String,
          messageType: String
      },
      computed: {
        messageClass(){
          return `panel panel-${this.messageType}`;
        }
      },
      watch: {
        message(newValue) {
          if (newValue) {
            setTimeout(() =>{ this.$store.dispatch('alert/clear'); }, 5000);
          }
        }
      }
    }
</script>

<style scoped>
  .message-bar {
    position: fixed;
    top: 2%;
    left: 49%;
    width: 50%;
    min-height: 50px;
    z-index: 9999;
    color: #ffffff;
  }
  .message-bar .close-btn {
    position: absolute;
    top: -5%;
    right: 0;
    color: #ffffff !important;
  }
  .message-bar .panel {
    border-color: transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding-right: 25px;
  }
  .panel {
    padding: 10px 15px;
  }
  .panel-alert-success {
    background-color: #5cb85c;
    color: #FFF;
  }
  .panel-alert-error {
    background-color: #f0ad4e;
    color: #FFF;
  }
</style>

