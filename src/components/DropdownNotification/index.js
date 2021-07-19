import Styles from './DropdownNotification.module.css';

const DropdownNotification = ({ data, onClick }) => {
  return (
    <>
      {/* <span className={Styles.caretDown}></span>
      <span className={Styles.caretDown2}></span> */}
      <div
        className={Styles.dropdown}
        style={{ overflowY: data.length <= 5 ? 'unset' : 'auto' }}
      >
        <h3
          style={{
            padding: '10px',
            paddingBottom: '5px',
            boxShadow: '0 9px 0 0 #5A57AB',
          }}
        >
          Notifikasi
        </h3>
        {data?.length === 0 && (
          <div className={Styles.noNotif}>
            <p className={Styles.textMenu}>0 Pending</p>
          </div>
        )}
        {data?.length > 0 &&
          data?.map((notification, idx) => (
            <div
              key={idx}
              className={Styles.dropdownMenu}
              onClick={() => onClick(notification.id)}
            >
              <p className={Styles.textMenu}>
                {notification.house.name} - {notification.user.fullname}
              </p>
              <span
                className={`${Styles.divider} ${
                  data.length <= 5 && Styles.wDiv
                }`}
              ></span>
            </div>
          ))}
      </div>
    </>
  );
};

export default DropdownNotification;
