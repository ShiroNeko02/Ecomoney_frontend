<v-container>
<!-- Select Device -->
<v-form>
  <div style="margin-top: 20px;">
    <ComboBox label="Device" v-model="selectedDeviceName" :items="deviceNames" />
  </div>
</v-form>

<!-- Select Dates -->
<v-row>
  <v-col cols="6">
    <DateInput v-model="startDate" label="Start Date" />
  </v-col>
  <v-col cols="6">
    <DateInput v-model="endDate" label="End Date" />
  </v-col>
</v-row>

<!-- Select Period -->
<v-radio-group v-model="period" inline class="my-2">
  <v-radio class="mr-3" label="Per Week" value="week"></v-radio>
  <v-radio class="mr-3" label="Per Month" value="month"></v-radio>
  <v-radio class="mr-3" label="Per year" value="year"></v-radio>
</v-radio-group>

<!-- Consumption Cards -->
<v-row>
  <v-col
    v-for="consumption in consumptions_devices_users"
    :key="consumption.label"
    cols="12"
    md="4"
  >
    <v-card class="mt-2 pa-4 bg-light elevation-20">
      <v-row align="center">
        <v-col cols="6" class="d-flex align-center">
            <span class="ml-3 text-subtitle-1 text-black font-weight-medium">
              {{ consumption.label }}
            </span>
        </v-col>
        <v-col cols="6" class="text-right">
          <div>
              <span class="text-h5 font-weight-bold text-black text-center">
                {{ consumption.total_euros }}
              </span>
          </div>
          <div>
            <span class="text-h7 text-black text-center">euro</span>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</v-row>
</v-container>
