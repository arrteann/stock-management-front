<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>PRODUCTS</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.stock"
                        label="Stock"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="buyItem(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({ name: "home" })
export default class Home extends Vue {
  stock = 0;
  dialog = false;
  dialogDelete = false;
  headers = [
    { text: "ID", value: "id", divider: true },
    {
      text: "NAME",
      align: "start",
      sortable: false,
      value: "name",
    },
    { text: "STOCK", value: "stock" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  products: [] = [];
  editedIndex: any = -1;
  editedItem: any = {
    id: 0,
    name: "",
    stock: 0,
  };
  defaultItem = {
    id: 0,
    name: "",
    stock: 0,
  };

  get formTitle() {
    return "SHOP";
  }

  @Watch("dialog")
  onchangeDialog(val: any) {
    val || this.close();
  }

  created() {
    this.initialize();
  }

  async initialize() {
    await this.$store.dispatch("fetchProducts");
    this.products = this.$store.state.products;
  }

  buyItem(item: never): void {
    this.editedIndex = this.products.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.stock = this.editedItem["stock"];
    this.dialog = true;
  }

  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  sendToBackEnd(payload: any) {
    let buyNewItem = Number.parseInt(payload["stock"]) > this.stock;
    let data = {
      id: payload["id"],
      amount: 0,
    };

    if (buyNewItem) {
      data["amount"] = Number.parseInt(payload["stock"]) - this.stock;
      this.$store.dispatch("refill", data);
    } else {
      data["amount"] = this.stock - Number.parseInt(payload["stock"]);
      this.$store.dispatch("buy", data);
    }
  }

  save(): void {
    if (this.editedIndex > -1) {
      Object.assign(this.products[this.editedIndex], this.editedItem);
    } else {
      let dataToPush: never = this.editedItem as never;
      this.products.push(dataToPush);
    }
    this.sendToBackEnd(this.editedItem);
    this.close();
  }
}
</script>
