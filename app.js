const { createClient } = supabase
const supabaseUrl = '';
const supabaseKey = '';
const _supabase = createClient(supabaseUrl, supabaseKey);

const app = Vue.createApp({
    data() {
        return {
            studentsArray: []
        };
    },

    methods: {
        async getStudents() {
            await getStudentsFromDB()
            .then(e => this.studentsArray = e);
        }
    },
    beforeMount() {
        this.getStudents();
    }
});

async function getStudentsFromDB() {
    try {
        const { data, error} = await _supabase.from('attendance').select();
        const students = []

        if (data && data.length > 0) {
            data.forEach(student => {
                students.push(student.rollnumber);
            });
            console.log(students);
            return students

        } else {
            console.log('No attendance data available.');
        }
        

    } catch (error) {
        console.error('Error:', error.message);
        alert('Error recording attendance. Please try again.');
    }
}
app.mount("#app");  