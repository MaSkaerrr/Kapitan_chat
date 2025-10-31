
export default function ChatArea() {


    return (
        
        <div>
            <div className="sidebar-overlay" id="sidebarOverlay"></div>
            <div class="chat-area">
            <div class="chat-header-area">
                <div class="chat-user-info">
                    <div class="chat-user-avatar">AS</div>
                    <div>
                        <div class="chat-user-name">Alex Smith</div>
                        <div class="chat-user-status">online</div>
                    </div>
                </div>
                <div class="chat-actions">
                    <button class="icon-btn"><i class="fas fa-search"></i></button>
                    <button class="icon-btn"><i class="fas fa-ellipsis-v"></i></button>
                </div>
            </div>

            {/* <!-- Область сообщений --> */}
            <div class="messages-container">
                <div class="message received">
                    <div class="message-avatar avatar-1">AS</div>
                    <div class="message-content">
                        <div class="message-text">I had science and creative careers, but I decided to read it in story?</div>
                        <div class="message-time">12:40</div>
                    </div>
                </div>
                
                <div class="message sent">
                    <div class="message-avatar">JD</div>
                    <div class="message-content">
                        <div class="message-text">You answered more.</div>
                        <div class="message-time">12:41</div>
                    </div>
                </div>
                
                <div class="message received">
                    <div class="message-avatar avatar-1">AS</div>
                    <div class="message-content">
                        <div class="message-text">Mixed feelings about it, but I think it was the right choice.</div>
                        <div class="message-time">12:45</div>
                    </div>
                </div>
                
                <div class="message sent">
                    <div class="message-avatar">JD</div>
                    <div class="message-content">
                        <div class="message-text">Sometimes we need to follow our intuition even when it doesn't seem logical.</div>
                        <div class="message-time">12:46</div>
                    </div>
                </div>
            </div>

            {/* <!-- Поле ввода сообщения --> */}
            <div class="message-input-container">
                <div class="message-input-wrapper">
                    <button class="icon-btn"><i class="fas fa-paperclip"></i></button>
                    <input type="text" class="message-input" placeholder="Write message..." />
                    <div class="input-actions">
                        <button class="icon-btn"><i class="far fa-smile"></i></button>
                        <button class="send-button"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}