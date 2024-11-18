import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from "../firebase"; // استيراد إعدادات Firebase الخاصة بالمصادقة

function ProtectedRoute({ element }) {
  // التحقق إذا كان المستخدم مسجل الدخول
  const user = auth.currentUser;

  // إذا لم يكن المستخدم مسجلاً الدخول، يتم تحويله إلى صفحة تسجيل الدخول
  if (!user) {
    return <Navigate to="/login" />;
  }

  // إذا كان المستخدم مسجلاً الدخول، يتم عرض المحتوى المرسل كـ "element"
  return element;
}

export default ProtectedRoute;
