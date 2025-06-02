# Documentación de la Aplicación: Dashboard de E-commerce

## Introducción
Este proyecto es un dashboard para la gestión de un e-commerce. Permite a los administradores gestionar productos, pedidos, usuarios y visualizar estadísticas clave del negocio. La aplicación está dividida en un cliente (frontend) y un servidor (backend), con funcionalidades específicas para cada parte.

Este documento se enfoca en el **panel de administración (dashboard)**, que es la sección principal para los administradores.

---

## Panel de Administración (Dashboard)

El panel de administración es accesible desde la ruta `/panel` y está dividido en varias secciones clave:

### **1. Resumen General (Dashboard)**

#### **Descripción**
Esta sección muestra un resumen general del estado del negocio. Incluye:
- **Total de Productos**: Número total de productos registrados.
- **Total de Categorías**: Número de categorías disponibles.
- **Ventas Totales**: Cantidad de pedidos completados.
- **Usuarios Registrados**: Número de usuarios registrados en la plataforma.
- **Ingresos Totales**: Suma de los ingresos generados por las ventas.

#### **Gráficos**
- **Ventas por Categoría**: Un gráfico de barras que muestra la cantidad de ventas por cada categoría.
- **Evolución de Ingresos**: Un gráfico de barras que muestra los ingresos mensuales.
- **Productos por Categoría**: Un gráfico circular que muestra la distribución de productos por categoría.

---

### **2. Gestión de Productos**

#### **Descripción**
Permite a los administradores gestionar los productos del catálogo. Incluye:
- **Lista de Productos**: Una tabla con los productos registrados, mostrando su nombre, precio y categoría.
- **Filtros**: Un selector para filtrar productos por categoría.
- **Acciones**:
  - **Agregar Producto**: Abre un modal para registrar un nuevo producto.
  - **Editar Producto**: Permite modificar los datos de un producto existente.
  - **Eliminar Producto**: Elimina un producto seleccionado.

#### **Datos Destacados**
- **Productos Más Vendidos**: Una lista y tarjeta que destacan los productos con mayor número de ventas.

#### **Ejemplo de Código**
```jsx
<button
  onClick={() => setMostrarModalAgregar(true)}
  className="bg-green-500 text-white px-4 py-2 rounded-md"
>
  Agregar Producto
</button>
---

### **3. Gestión de Pedidos**

#### **Descripción**
Permite a los administradores gestionar los pedidos realizados por los usuarios. Incluye:
- **Pedidos Pendientes**: Una tabla que muestra los pedidos que aún no han sido completados.
- **Pedidos Completados**: Estadísticas sobre los pedidos finalizados.
- **Gráficos**:
  - **Pedidos por Estado**: Un gráfico circular que muestra la distribución de pedidos por estado (pendiente, completado, etc.).
  - **Tendencia de Pedidos**: Un gráfico de barras que muestra la cantidad de pedidos realizados por mes.

#### **Acciones**
- **Completar Pedido**: Marca un pedido como completado.
- **Eliminar Pedido**: Elimina un pedido seleccionado.

---

### **4. Gestión de Usuarios**

#### **Descripción**
Permite a los administradores gestionar los usuarios registrados en la plataforma. Incluye:
- **Lista de Usuarios**: Una tabla que muestra los usuarios registrados, con su nombre, correo y rol.
- **Filtros**:
  - Búsqueda por nombre, apellido o correo.
  - Filtrado por rol (admin o usuario).
- **Acciones**:
  - **Editar Usuario**: Modifica los datos de un usuario.
  - **Eliminar Usuario**: Elimina un usuario seleccionado.

---

### **5. Perfil del Administrador**

#### **Descripción**
Permite al administrador visualizar y actualizar su información personal, como nombre, correo y contraseña.

---

## Tecnologías Utilizadas
- **Frontend**: React, Axios, TailwindCSS.
- **Backend**: Node.js, Express, MongoDB.
- **Gráficos**: Recharts.