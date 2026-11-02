import { createSignal } from "solid-js";

import { LinkButton } from "#components/ui/button";
import { Input } from "#components/ui/input";

export function CreateNewPost() {
  const [id, setId] = createSignal("");

  return (
    <div class="flex gap-2">
      <Input
        value={id()}
        onInput={(e) => {
          setId(e.currentTarget.value);
        }}
        onKeyPress={(e) => {
          if (e.code === "Enter" && id() !== "") {
            window.location.href = `${window.location.protocol}//${window.location.host}/admin/${id()}`;
          }
        }}
      />
      <LinkButton href={`/admin/${id()}`}>작성</LinkButton>
    </div>
  );
}
