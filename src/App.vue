<template>
  <div id="app" class="container-fluid">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Encode or decode url</div>
          </md-card-header>

          <md-card-content>
            <md-field :class="messageClass">
              <label>Url</label>
              <md-input v-model="url" style="width: 100%;"></md-input>
              <span class="md-error">{{errors}}</span>
            </md-field>

            <md-button class="md-raised" :md-ripple="false" @click.prevent="submit('encode')">Encode</md-button>
            <md-button class="md-raised" :md-ripple="false" @click.prevent="submit('decode')">Decode</md-button>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Result of {{ action || 'operation' }}</div>
          </md-card-header>

          <md-card-content>
            {{result}}
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

  import apiCall from './utils/api.js';

  export default {
    data () {
      return {
        action: null,
        url: null,
        result: '-',
        errors: []
      };
    },
    computed: {
      messageClass () {
        return {
          'md-invalid': this.errors.length > 0
        };
      },
    },
    methods: {
      submit (action) {
        this.action = action;
        this.errors = [];
        this.makeRequest();
      },
      async makeRequest () {
        try {
          const { data } = await apiCall(this.action, { url: this.url });
          this.result = data.url;
        } catch (errors) {
          this.errors = errors.response.data.errors.url;
        }
      }
    },
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
