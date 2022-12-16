type Ev<Payload extends Record<string, unknown>> = Event & {detail: Payload};

export const modifyWindow = (window: Window): void => {
  window.addEventListener(`phx:message_sended`, (e: Ev<{message: string}>) => {
    const el = document.querySelector('#message_container');
    if (el === null) return;
    el.innerHTML += e.detail.message + '<br/>';
    console.log('message_sended', e);
  });
};
