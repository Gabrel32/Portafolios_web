const NotificationModal = ({ type, message, onClose }) => (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-beige-50 dark:bg-completColor rounded-xl p-8 max-w-md w-full shadow-xl relative border-2 border-custom-brown/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-custom-brown hover:text-efectHovercolor transition-colors text-2xl font-bold"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
            type === 'success' 
              ? 'bg-custom-brown/10' 
              : 'bg-red-100 dark:bg-red-900/20'
          }`}>
            {type === 'success' ? (
              <svg className="w-8 h-8 text-custom-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          
          <h3 className={`text-2xl font-bold ${
            type === 'success' ? 'text-custom-brown' : 'text-red-500'
          }`}>
            {type === 'success' ? '¡Mensaje Enviado!' : '¡Error!'}
          </h3>
          
          <p className="text-completColor dark:text-beige-50/90 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );

  export default NotificationModal