<template>
  <div class="card">
    <div class="card-wrapper">
      <div class="card-avatar">
        <span>
          {{ avatar }}
        </span>
      </div>

      <h3 class="card-content">
        <span class="card-title"> {{ title }} </span>
        <span class="card-count"> {{ stock }} </span>
      </h3>
    </div>

    <div class="card-icon">
      <router-link :to="{path:`product/${id}`}">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
            fill="currentColor"
          />
          <path
            d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
            fill="currentColor"
          />
          <path
            d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"
            fill="currentColor"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ type: Number }) id?: number;
  @Prop({ type: String, default: "" }) title?: string;
  @Prop({ type: Number }) stock?: number;

  get avatar() {
    return this.title?.toString()[0];
  }
}
</script>


<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15rem;
  height: 5rem;

  padding: 0.5rem 1.2rem;

  border-radius: 0.3rem;

  box-shadow: 0rem 0.1rem 0.3rem rgba($color: #302542, $alpha: 0.3);

  color: #333;

  &-wrapper {
    display: flex;
    align-items: center;
  }

  &-avatar {
    display: flex;

    margin: {
      right: 0.8rem;
    }

    span {
      font-size: 1rem;
      text-transform: uppercase;

      background-color: #302542;
      color: white;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;

      width: 2.8rem;
      height: 2.8rem;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &-title {
    text-transform: uppercase;
    font-size: 1rem;
  }

  &-count {
    font-size: 0.7rem;
    font-weight: 500;
    color: #302542;

    padding: 0.2rem 0rem;
    border-radius: 1rem;
  }

  &-icon {
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.4s ease;
    width: 2rem;
    height: 2rem;

    &:hover {
      display: flex;
      justify-content: center;
      align-items: center;

      color: white;
      background-color: #302542;
    }
  }
}
</style>