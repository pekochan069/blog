# Astro Starter Kit: Minimal

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 관리자 인증

`.env`와 Vercel 환경변수에 `ADMIN_ID`(12~~256자), `ADMIN_PASSWORD`(12~~1024자), `ADMIN_AUTH_SECRET`(최소 32자)을 설정합니다. 비밀번호는 길고 무작위인 값을 사용하고, 서명 키는 `openssl rand -hex 32`로 생성하세요. 값이 없으면 로그인이 거부됩니다.

- `/admin/login`에서 로그인하며 관리자 페이지와 글 저장 Action 모두 인증이 필요합니다.
- 쿠키는 HttpOnly/SameSite=Strict이고 운영 환경에서는 Secure이므로 HTTPS가 필요합니다.
- 세션은 8시간 뒤 만료됩니다. 로그아웃은 현재 브라우저의 쿠키만 삭제합니다. 유출된 토큰을 포함해 전체 세션을 무효화하려면 서명 키나 관리자 계정을 변경하세요.
- **공개 배포 전** Vercel Firewall 등에서 `/admin/login` POST 요청의 속도 제한을 설정하세요. 서버리스 인스턴스별 메모리 제한은 우회 가능하므로 앱 내부 제한으로 대체하지 않습니다.
- 인증 테스트: `NODE_ENV=development bun test src/lib/server`

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
