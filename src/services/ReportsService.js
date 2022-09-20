import api from './Api';

// Obtiene la información para el reporte de citas asistidas, no asistidas y canceladas
export const getAppointments = async(data) => {
    return await api.post('/report/appoinment', {
        from: data.from,
        to: data.to,
        officeId: data.officeId,
        appoinmentStatusId: data.appoinmentStatusId
    })
}

// Obtiene la información para el reporte de citas agendadas
export const getScheduledAppointments = async(data) => {
    return await api.post('/report/appoinment/scheduled', {
        from: data.from,
        to: data.to,
        officeId: data.officeId,
        dentistId: data.dentistId
    })
}

export const getRankingDentalService = async(data) => {
    return await api.post('/report/most-requested/services', {
        from: data.from,
        to: data.to,
        officeId: data.officeId,
    });
}