// Función para procesar los datos del formulario y estructurar los puntos de muestreo
export const processFormData = (formData, puntosMuestreo) => {
    const processedData = { ...formData };

    // Validar y transformar tipos de datos
    if (processedData.license_number) {
        const licenseNum = parseInt(processedData.license_number);
        processedData.license_number = isNaN(licenseNum) ? null : licenseNum;
    } else {
        processedData.license_number = null;
    }

    // Limpiar fechas vacías
    if (!processedData.calibration_date || processedData.calibration_date === '') {
        processedData.calibration_date = null;
    }
    if (!processedData.measurement_date || processedData.measurement_date === '') {
        processedData.measurement_date = null;
    }

    // Limpiar tiempos vacíos
    if (!processedData.measurement_start_time || processedData.measurement_start_time === '') {
        processedData.measurement_start_time = null;
    }
    if (!processedData.measurement_end_time || processedData.measurement_end_time === '') {
        processedData.measurement_end_time = null;
    }

    // Limpiar campos de texto vacíos
    const textFields = [
        'company_name', 'tax_id', 'address', 'city', 'state', 'postal_code', 'working_hours',
        'first_name', 'last_name', 'instrument_model_serial', 'methodology', 'atmospheric_conditions',
        'sampling_observations', 'conclusions', 'recommendations'
    ];

    textFields.forEach(field => {
        if (!processedData[field] || processedData[field] === '') {
        processedData[field] = null;
        }
    });

    // Extraer y estructurar los puntos de muestreo
    const samplingPoints = [];

    puntosMuestreo.forEach((punto) => {
        const samplingPoint = {
        time: formData[`sampling_point_${punto.id}_time`] || null,
        sector: formData[`sampling_point_${punto.id}_sector`] || null,
        section: formData[`sampling_point_${punto.id}_section`] || null,
        illumination_type: formData[`sampling_point_${punto.id}_illumination_type`] || null,
        source_type: formData[`sampling_point_${punto.id}_source_type`] || null,
        illumination: formData[`sampling_point_${punto.id}_illumination`] || null,
        luminance_uniformity: formData[`sampling_point_${punto.id}_luminance_uniformity`] || null,
        average_value: formData[`sampling_point_${punto.id}_average_value`] || null,
        required_value: formData[`sampling_point_${punto.id}_required_value`] || null
        };
        
        // Solo agregar el punto si tiene al menos un campo con datos
        if (Object.values(samplingPoint).some(value => value !== null && value !== '')) {
        samplingPoints.push(samplingPoint);
        }
    });

    // Asignar la lista de puntos de muestreo procesados
    processedData.sampling_points = samplingPoints;

    // Eliminar los campos individuales de puntos de muestreo del objeto principal
    puntosMuestreo.forEach((punto) => {
        delete processedData[`sampling_point_${punto.id}_time`];
        delete processedData[`sampling_point_${punto.id}_sector`];
        delete processedData[`sampling_point_${punto.id}_section`];
        delete processedData[`sampling_point_${punto.id}_illumination_type`];
        delete processedData[`sampling_point_${punto.id}_source_type`];
        delete processedData[`sampling_point_${punto.id}_illumination`];
        delete processedData[`sampling_point_${punto.id}_luminance_uniformity`];
        delete processedData[`sampling_point_${punto.id}_average_value`];
        delete processedData[`sampling_point_${punto.id}_required_value`];
    });

    return processedData;
}