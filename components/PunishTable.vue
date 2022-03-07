<template>
  <Container>
    <div class="flex flex-col col-span-12">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-700">
              <thead class="bg-gray-900">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Jogador</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Staff</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Motivo</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Data</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Expira</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Servidor</th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Status</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-gray-800 divide-y divide-gray-700">
                <tr v-for="punish in punishs" :key="punish.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-lg" :src="'https://minotar.net/avatar/' + (punish.history ? punish.history.name : 'steve')" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-200" v-text="punish.history ? punish.history.name : 'Desconhecido'" />
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-lg" :src="'https://minotar.net/avatar/' + punish.banned_by_name" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-200" v-text="punish.banned_by_name" />
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-200" v-text="punish.reason"/>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    <div v-text="getDate(punish.time)"/>
                    <div v-text="getTime(punish.time)"/>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    <span v-if="punish.until === '-1'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"> Permanente </span>
                    <span v-else>
                      <div v-text="getDate(punish.until)"/>
                      <div v-text="getTime(punish.until)"/>
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200 capitalize" v-text="punish.server_origin" />
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-if="punish.removed_by_uuid" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"> Removido </span>
                    <span v-else-if="punish.active === '1'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> Ativo </span>
                    <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"> Expirado </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script>
export default {
  props: {
    punishs: {
      type: Array,
      required: true
    },
  },
  methods: {
    getDate(time) {
      return new Date(+time).toLocaleDateString();
    },
    getTime(time) {
      return new Date(+time).toLocaleTimeString()
    }
  }
}
</script>
