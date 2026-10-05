import { Button } from "#components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { GithubIconIcon } from "#icons/logos/github-icon";
import { MenuIcon } from "#icons/runeicons/normal/menu";
import { SquareArrowOutUpRightIcon } from "#icons/runeicons/normal/square-arrow-out-up-right";

export function MobileHeaderNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon-lg">
          <MenuIcon class="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div class="relative">
            <GithubIconIcon class="size-5 rotate-0 opacity-100 transition-all md:group-hover:-rotate-45 md:group-hover:opacity-0" />
            <SquareArrowOutUpRightIcon class="absolute top-0 left-0 hidden size-5 rotate-45 opacity-0 transition-all md:block md:group-hover:rotate-0 md:group-hover:opacity-100" />
          </div>
          <span class="sr-only text-lg font-semibold md:not-sr-only">Github</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
