import API from './api'


export const getLineChart = async (data) => {
    console.log(data);
    try {
        const response = await API.post("dashboard/linechart",data)
        return response.data
    } catch (error) {
        throw error
    }
}

