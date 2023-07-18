import store from "../stores"

export const authentication = {
  async install() {
    try {
      await store.dispatch('attempt');
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
