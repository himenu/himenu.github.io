<template>
  <div>
    <vuetable ref="vuetable"
      :api-url="'/compensation?compID='+compensation_id"
      :fields="fields"
      pagination-path=""
      :css="css.table"
      :sort-order="sortOrder"
      :multi-sort="true"
      :append-params="moreParams"
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>
      <!-- @vuetable:cell-clicked="onCellClicked" -->
    <div class="vuetable-pagination">
      <vuetable-pagination-info ref="paginationInfo"
        info-class="pagination-info"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'
import moment from 'moment'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import Vue from 'vue'
import VueEvents from 'vue-events'
// import CompensationCustomActions from './CompensationCustomActions'
// import CompensationFilterBar from './CompensationFilterBar'
Vue.use(VueEvents)
// Vue.component('compensation-custom-actions', CompensationCustomActions)
// Vue.component('compensation-filter-bar', CompensationFilterBar)
export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
  },
  props: ['compensation_id'],
  data () {
    return {
      fields: [
        {
          name: '__sequence',
          title: '#',
          titleClass: 'text-right',
          dataClass: 'text-right'
        },
       
        {
          name: 'date',
          sortField: 'employcompensationCodeeeName',
          title: 'Date',
        },
        {
          name: 'msg',
          sortField: 'compensationName',
          title: 'Message',
        },
        {
          name: 'status',
          sortField: 'grossOrNet',
          title: 'Status',
        },
        // {
        //   name: 'Amount',
        //   sortField: 'Amount',
        //    titleClass: 'text-center',
        //   dataClass: 'text-right',
        //   callback: 'formatNumber'
        // },
        
        // {
        //   name: '__component:compensation-custom-actions',
        //   title: 'Actions',
        //   titleClass: 'text-center',
        //   dataClass: 'text-center'
        // }
      ],
      css: {
        table: {
          tableClass: 'table table-bordered table-striped table-hover',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down'
        },
        pagination: {
          wrapperClass: 'pagination',
          activeClass: 'active',
          disabledClass: 'disabled',
          pageClass: 'page',
          linkClass: 'link',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: '',
          },
        },
        icons: {
          first: 'glyphicon glyphicon-step-backward',
          prev: 'glyphicon glyphicon-chevron-left',
          next: 'glyphicon glyphicon-chevron-right',
          last: 'glyphicon glyphicon-step-forward',
        },
      },
      sortOrder: [
        { field: 'email', sortField: 'email', direction: 'asc'}
      ],
      moreParams: {}
    }
  },
  methods: {
    allcap (value) {
      return value.toUpperCase()
    },
    statusLabel (value) {
      return value === '1'
        ? '<span class="label label-success"><i class="glyphicon glyphicon-star"></i>Matched    <mu-badge content="old" color="primary"></mu-badge></span>'
        : '<span class="label label-danger"><i class="glyphicon glyphicon-heart"></i> Not Matched</span>'
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
  },
  events: {
    'filter-set' (filterText) {
      this.moreParams = {
        filter: filterText
      }
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    },
    'filter-reset' () {
      this.moreParams = {}
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    },
    'refresh-table' () {
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    }
  }
}
</script>
<style>

.pagination {
  margin: 0;
  float: right;
}
.pagination a.page {
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 2px;
}
.pagination a.page.active {
  color: white;
  background-color: #AD1B02;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 2px;
}
.pagination a.btn-nav {
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 7px;
  margin-right: 2px;
}
.pagination a.btn-nav.disabled {
  color: lightgray;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 7px;
  margin-right: 2px;
  cursor: not-allowed;
}
.pagination-info {
  float: left;
}
.label {
  padding: 5px;
  border-radius: 3px;
}
.label-success{
  background: #1ebd1e;
    color: white;
}
.label-danger{
    background: #ff7676;
    color: white;
}
</style>
