import axios from 'axios';

// Pastikan URL ini sesuai dengan lokasi file api.php Anda di XAMPP
const API_URL = 'https://backend-management.tiiny.io/api.php';

class TaskService {
    getAllTasks() {
        return axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    createTask(task) {
        return axios.post(API_URL, JSON.stringify(task), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    updateTask(task) {
        return axios.put(API_URL, JSON.stringify(task), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    deleteTask(id) {
        return axios.delete(`${API_URL}?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
}

export default new TaskService();