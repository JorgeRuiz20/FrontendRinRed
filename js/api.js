const BASE_URL = "https://backendrinred.onrender.com/api";

async function obtenerViajesPendientes(dni) {
  const response = await fetch(`${BASE_URL}/viajes/pendientes?dni=${dni}`);
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
}

async function obtenerViajesFinalizados(dni) {
  const response = await fetch(`${BASE_URL}/viajes/finalizados?dni=${dni}`);
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
}

async function cancelarViaje(id) {
  const response = await fetch(`${BASE_URL}/viajes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    // Si hay error, intenta obtener el mensaje
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cancelar");
    } catch {
      throw new Error("Error al procesar la cancelación");
    }
  }
  
  // Si la respuesta está vacía (como suele pasar con DELETE)
  if (response.status === 204) {
    return { success: true }; // Respuesta artificial para DELETE exitoso
  }
  
  // Si el backend devuelve algún contenido
  return await response.json().catch(() => ({ success: true }));
}