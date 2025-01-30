import { For } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { TablerMenu2 } from "../icons/tabler/menu-2";

type MobileSidebarProps = {
  contents: any[];
  current: string;
};

export default function MobileSidebar(props: MobileSidebarProps) {
  return (
    <Drawer>
      <DrawerTrigger as={Button} variant="ghost" size="icon" class="lg:invisible lg:hidden">
        <TablerMenu2 class="size-5" />
      </DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto h-[50svh] w-full max-w-[80ch] p-4">
          <DrawerHeader>
            <DrawerTitle class="text-2xl">블로그의 다른 글들</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div>
            <ul class="flex flex-col gap-2">
              <For each={props.contents}>
                {(content) => (
                  <li>
                    <a
                      class="text-base text-muted-foreground hover:text-foreground data-[current=true]:font-semibold data-[current=true]:text-foreground data-[current=true]:underline"
                      href={`/posts/${content.id}`}
                      data-current={props.current === content.id}
                    >
                      {content.data.title}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
