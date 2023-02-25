
export function onAppCreated({ app, router }: any) {
  // console.log(app)
}

export function onMounted({ app, router }: any) {
  // console.log(router)
  app.provide('umi-hello', {
    h: 'hello',
    w: 'word',
  });
}