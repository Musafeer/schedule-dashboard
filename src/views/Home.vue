<template>
<div>
    <div class="row justify-content-md-center">
        <div class="col-4 p-5">
            <div class="row justify-content-between align-items-center">
                <h3 class="mb-0">Schedule Appoinment</h3>
                <b-button v-b-modal.modal-scrollable variant="success" @click="onClickAdd">
                    Add
                </b-button>
            </div>
        </div>
    </div>
    <div>
        <b-table striped hover v-for="schedule in schedules" :key="schedule.id" :fields="fields" :items="items" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
            <template slot="actions">
                <b-button variant="success" size="sm" @click="onHandleClickUpdate(schedule)" class="mr-1">
                    Update
                </b-button>
                <b-button variant="danger" size="sm" @click="onHandleClickDelete(schedule.id)">
                    Delete
                </b-button>
            </template>
        </b-table>
    </div>
    <b-modal id="modal-add-schedule" scrollable title="Add Appoinment" @hidden="onHandleCancel">
        <b-form>
            <b-form-group label="Name:">
                <b-form-input v-model="form.name" type="text" placeholder="Add Name" />
            </b-form-group>
            <b-form-group label="Email:">
                <b-form-input type="email" v-model="form.email" placeholder="Add Email" />
            </b-form-group>
            <b-form-group label="Phone:">
                <b-form-input type="tel" v-model="form.phone" placeholder="Add Phone Number" />
            </b-form-group>
            <b-form-group label="Date:">
                <b-form-datepicker v-model="form.date" placeholder="Select a Date" class="mb-2"></b-form-datepicker>
            </b-form-group>
            <b-form-group label="Time:">
                <b-form-timepicker v-model="form.time" placeholder="Select a Time" locale="en">
                </b-form-timepicker>
            </b-form-group>
            <b-form-group label="Services:">
                <b-form-select v-model="form.services" :options="several" placeholder="Please select a service"></b-form-select>
            </b-form-group>

        </b-form>
        <template #modal-footer>
            <div class="w-100">
                <b-button @click="onHandleCancel">
                    Cancel
                </b-button>
                <b-button variant="primary" class="float-right" @click="onHandleUpdate" v-if="form.id">
                    Update
                </b-button>
                <b-button variant="primary" class="float-right" @click="onHandleConfirm" v-else>
                    Confirm
                </b-button>
            </div>
        </template>
    </b-modal>
</div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            schedules: [],
            form: {
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                services: "",
            },
            selected: '',
            several: [{
                    value: '',
                    text: 'Please select a service'
                },
                {
                    value: 'Identity Card',
                    text: 'Identity Card'
                },
                {
                    value: 'Birth',
                    text: 'Birth'
                },
                {
                    value: 'Death',
                    text: 'Death'
                },
                {
                    value: 'Adoption',
                    text: 'Adoption'
                },
                {
                    value: 'Marriage',
                    text: 'Marriage'
                },
                {
                    value: 'Divorce',
                    text: 'Divorce'
                },
                {
                    value: 'Citizenship',
                    text: 'Citizenship'
                }
            ],
        };
    },

    mounted() {
        this.getSchedules();
    },

    methods: {
        getSchedules() {
            this.$http({
                method: "get",
                url: "/schedules"
            }).then(res => {
                this.schedules = res.data;
            });
        },
        onClickAdd() {
            this.$bvModal.show("modal-add-schedule");
        },

        onHandleConfirm() {
            this.$http.post("/schedules", this.form()).then(() => {
                this.form = {
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    services: ''
                };
                this.$bvModal.hide("modal-add-schedule");
                this.getSchedules();
            });
        },

        onHandleUpdate() {
            this.$http.patch(
                    `/schedules/${this.form.id}`,
                    this.form
                )
                .then(() => {
                    this.form = {
                        name: '',
                        email: '',
                        phone: '',
                        date: '',
                        time: '',
                        services: ''
                    }
                    this.$bvModal.hide('modal-add-schedule')
                    this.getSchedules()
                })
        },
        onHandleCancel() {
            this.form = {
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                services: ''
            };
            this.$bvModal.hide("modal-add-schedules");
        },
        onHandleClickDelete(id) {
            this.$http.delete(`/schedules/${id}`)
                .then(() => {
                    this.form = {
                        name: '',
                        email: '',
                        phone: '',
                        date: '',
                        time: '',
                        services: ''
                    }
                    this.$bvModal.hide('modal-add-schedule')
                    this.getSchedules()
                })
        },
        onHandleClickUpdate(schedule) {
            this.form = schedule;
            this.$bvModal.show("modal-add-schedule");
        }
    }
}
</script>
