import React, { useState } from 'react';
import "../../css/notification.css"
export default function Notification({ message, type }) {

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  );
};

